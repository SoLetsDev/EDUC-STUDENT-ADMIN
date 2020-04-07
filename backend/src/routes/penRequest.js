const passport = require('passport');
const express = require('express');
const router = express.Router();
const auth = require('../components/auth');
const { completePenRequest, getAllPenRequests, getPenRequestById, getPenRequestCommentById, postPenRequestComment, putPenRequest, rejectPenRequest, returnPenRequest,findPenRequestsByPen } = require('../components/penRequests');
const { getDocuments, getDocumentById, updateDocumentTypeById } = require('../components/documents');

/**
 * Creates a comment for a pen request given a pen request id
 */
router.post('/:id/comments', passport.authenticate('jwt', {session: false}, undefined), auth.isValidAdminToken, postPenRequestComment);

/**
 * Gets all the comments for a pen request by pen request id
 */
router.get('/:id/comments', passport.authenticate('jwt', {session: false}, undefined), auth.isValidAdminToken, getPenRequestCommentById);

/**
 * Updates a pen retrieval request
 * */
router.put('/', passport.authenticate('jwt', {session: false}, undefined), auth.isValidAdminToken, putPenRequest);

/*
 * Get all pen retrieval requests
 */
router.get('/', passport.authenticate('jwt', {session: false}, undefined), auth.isValidAdminToken, getAllPenRequests);

/*
 * Get all pen retrieval requests for a given pen number in the query parameter.
 */
router.get('/duplicatePenRequests', passport.authenticate('jwt', {session: false}, undefined), auth.isValidAdminToken, findPenRequestsByPen);

/*
 * Get a pen request by id
 */
router.get('/:id', passport.authenticate('jwt', {session: false}, undefined), auth.isValidAdminToken, getPenRequestById);

router.post('/complete', passport.authenticate('jwt', {session: false}, undefined), auth.isValidAdminToken, completePenRequest);

router.post('/reject', passport.authenticate('jwt', {session: false}, undefined), auth.isValidAdminToken, rejectPenRequest);

router.post('/return', passport.authenticate('jwt', {session: false}, undefined), auth.isValidAdminToken, returnPenRequest);

// retrieve all the documents.
router.get('/:id/documents', passport.authenticate('jwt', {session: false}, undefined), auth.isValidAdminToken, getDocuments);

// retrieve the document by its id.
router.get('/:id/documents/:documentId', auth.isValidAdminToken, getDocumentById);

// Updates the type of a document by its id.
router.put('/:id/documents/:documentId', passport.authenticate('jwt', {session: false}, undefined), auth.isValidAdminToken, updateDocumentTypeById);

module.exports = router;
