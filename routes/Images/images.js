var express = require('express');
var ImageUpload = require( "express-azure-image-upload" ); // This will not be necessary if uploadImage is deleted
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var azure = require('azure-storage');
var multiparty = require('multiparty');
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;
var blobSvc = azure.createBlobService();

/**
 * @api {get} api/images/ Gets root of images API
 * @apiName Images
 * @apiGroup Images
 *
 * @apiSuccess status message; this endpoint doesn't actually do anything
 */
router.get('/', isAuthenticated, function(req, res, next)
{
	res.status(200).send({message: "Root of myFields image handling API"});
});

/**
 * @api {post} api/images/listBlobs ListBlobs
 * @apiName ListBlobs Images
 * @apiGroup Images
 *
 * @apiHeader Token for now... obviously not gonna work later
 * @apiParam {string} container The name of the Azure Storage container (should be provided by app calling API)
 *
 * @apiSuccess {array} object Array of blob descriptions
 */
router.post('/listBlobs', isAuthenticated, isTypes(['Admin', 'Inspector']), function(req, res, next)
{
	if(!req.body.container)
	{
		res.status(500).send({message: "Missing post parameters."});
	}
	else {
		var blobs = [];
		// Helper function for calling Azure API
		function handleBlobs(container, token){
			blobSvc.listBlobsSegmented(container, token, function(error, result, response)
            {
				if(error)
				{
					res.status(500).send({message: "Error getting blobs from Azure"});
				}
				else{
					// Concatenate entry from azure table
					blobs += result.entries;
					// If there is a continuation token, recursively call handleBlobs
					if(result.continuationToken)
					{
						handleBlobs(container, result.continuationToken);
					}
					// If there is no continuation token, we're done
					else
					{
						res.status(200).send(JSON.stringify(blobs));
					}
				}
			})
		}
		handleBlobs(req.body.container, null);
	}
});

/**
 * @api {post} api/images/downloadBlob DownloadBlob
 * @apiName DownloadBlob Images
 * @apiGroup Images
 *
 * @apiHeader JWT
 * @apiParam {string} container The name of the Azure Storage container (should be provided by app calling API)
 * @apiParam {string} blob The name of the blob to download
 */
router.post('/downloadBlob', isAuthenticated, isTypes(['Admin', 'Inspector']), function(req, res, next)
{
	if(!req.body.container || !req.body.blob)
	{
		res.status(500).send({message: "Missing post parameters."});
	}
    else
    {
    	// Make sure the image exists
        blobSvc.getBlobProperties(req.body.container, req.body.blob, function(error, properties, status)
        {
            if (error)
            {
                res.send(500, "Error fetching file: %s", error.message);
            }
            else if (!status.isSuccessful)
            {
                res.send(404, "The file %s does not exist", req.body.blob);
            }
            else
            {
                // TODO: double-check this. I'm not too sure
            	// We are streaming the image and downloading of it can be client-side
                blobSvc.createReadStream(req.body.container, req.body.blob).pipe(res);
                res.status(200);
            }
        })
    }

});

/**
 * @api {post} api/images/deleteBlob DeleteBlob
 * @apiName DeleteBlob Images
 * @apiGroup Images
 *
 * @apiHeader JWT
 * @apiParam {string} container The name of the Azure Storage container (should be provided by app calling API)
 * @apiParam {string} blob The name of the blob to delete
 */
router.post('/deleteBlob', isAuthenticated, isTypes(['Admin']), function(req, res, next){
	if(!req.body.container || !req.body.blob){
		res.status(500).send({message: "Missing post parameters."});
	}
	else {
		blobSvc.deleteBlob(req.body.container, req.body.blob, function(error, response)
		{
			if(error){
				res.status(500).send({message: "Error deleting blob from Azure."})
			}
			else {
				res.status(200).send({message: "Blob deleted."});
			}
		});
	}
});

/*
	TODO: Fix one of the two post methods below to be able to upload a blob to Azure and get a URL to that blob returned
	then choose one. Both are close but neither work 100%
	Once that is done, fix App/www/reportingForm/reportForm.js
*/

/**
 * @api {post} api/images/addBlob addBlob
 * @apiName addBlob Images
 * @apiGroup Images
 *
 * @apiHeader JWT
 * @apiParam {string} container The name of the Azure Storage container (should be provided by app calling API)
 * @apiParam {string} filename The filename of the blob to add
 */
router.post('/addBlob', isAuthenticated, function(req, res, next)
{
	/*
		Known issues with this post: How to get URL returned
	 	http://willi.am/blog/2014/07/09/azure-blob-storage-and-node-all-together/
	 	https://docs.microsoft.com/en-us/azure/storage/storage-nodejs-how-to-use-blob-storage
	 	http://azure.github.io/azure-sdk-for-node/azure-storage-legacy/latest/BlobService.html#createBlobBlockFromStream
	 	http://willi.am/blog/2014/07/02/azure-blob-storage-and-node-creating-blobs/
	 */

	if(!req.body.container || !req.body.input){
		res.status(500).send({message: "Missing post parameters."});
	}
	var form = new multiparty.Form();
	form.on('part', function(part) {
		if (part.filename) {
			var filename = part.filename;
			var size = part.byteCount;

			var onError = function(error) {
				if (error){
					res.status(500).send({message: "Error uploading blob."});
				}
			};
			
			blobSvc.createBlockBlobFromStream(req.body.container, filename, part, size, onError);
		} 
		else {
			form.handlePart(part);
		}
	});
	form.parse(req);
	res.status(200).send({message: "Successfully uploaded blob."})
});

/**
 * @api {post} api/images/uploadImage Create
 * @apiName uploadImages
 * @apiGroup Images
 *
 * @apiParam {String} storageAccount The azure storage account name
 * @apiParam {String} storageKey The Azure storage account key
 * @apiParam {String} container The Azure storage container
 * @apiParam {String} image The image to upload
 *
 * @apiSuccess {Object} user The new user object.
 */
router.post('/uploadImage', isAuthenticated, function (req, res, next)
{
	/*
		This one seems very nice and simple, but not sure how to pass in the 'image' data property. Can't find a lot
		of documentation.
	 	https://www.npmjs.com/package/express-azure-image-upload
	 	https://github.com/projectweekend/express-azure-image-upload
	 */
    var imageUpload = new ImageUpload( req.body.storageAccount, req.body.storageKey, req.body.container );

    return imageUpload.handler;
});

module.exports = router;

