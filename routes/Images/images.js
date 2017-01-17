var express = require('express');
var models  = require('../../models');
var router = express.Router({mergeParams:true});
var azure = require('azure-storage');
var multiparty = require('multiparty'),
var azure = require('azure');
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
router.post('/listBlobs', isAuthenticated, isTypes(['Admin', 'Inspector']), function(req, res, next) {
	if(!req.body.container) {
		res.status(500).send({message: "Missing post parameters."});
	}
	else {
		var blobs = [];
		// Helper function for calling Azure API
		function handleBlobs(container, token){
			blobSvc.listBlobsSegmented(container, token, function(error, result, response){
				if(error){
					res.status(500).send({message: "Error getting blobs from Azure"});
					return;
				}
				else{
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
})

/**
 * @api {post} api/images/downloadBlob DownloadBlob
 * @apiName DownloadBlob Images
 * @apiGroup Images
 *
 * @apiHeader JWT
 * @apiParam {string} container The name of the Azure Storage container (should be provided by app calling API)
 * @apiParam {string} blob The name of the blob to download
 * @apiParam {string} output File name to save blob to locally
 */
router.post('/downloadBlob', isAuthenticated, isTypes(['Admin', 'Inspector']) function(req, res, next) {
	if(!req.body.container || !req.body.blob || !req.body.output){
		res.status(500).send({message: "Missing post parameters."});
	}
	else {
		blobSvc.getBlobToStream(req.body.container, req.body.blob, req.body.output, function, result, response){
			// TODO: change this to stream from Azure to client device
			if(error){
				res.status(500).send({message: "Error downloading blob from Azure."});
				return;
			}
			else{
				res.status(200).send({message: "Blob retrieved."});
			}
		}
	}
})

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
		})
	}
})

router.post('/addBlob', isAuthenticated, function(req, res, next)
{
	if(!req.body.container || !req.body.blob || !req.body.input){
		res.status(500).send({message: "Missing post parameters."});
	}
	// TODO: finish this
})