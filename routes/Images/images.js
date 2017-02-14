var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var azure = require('azure-storage');
var multiparty = require('multiparty');
var isAuthenticated = require('../Authentication/authenticationMiddlewear').isAuthenticated;
var isTypes = require('../Authentication/authenticationMiddlewear').isTypes;
var blobSvc = azure.createBlobService();

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
				else
				{
					blobs += result.entries;
					if(result.continuationToken)
					{
						handleBlobs(container, result.continuationToken);
					}
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
			
			blobSvc.createBlockBlobFromStream(req.body.container, req.body.filename, part, size, onError);
		} else {
			form.handlePart(part);
		}
	});
	form.parse(req);
	res.status(200).send({message: "Successfully uploaded blob."})
});