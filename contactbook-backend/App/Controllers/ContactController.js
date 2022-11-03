import ApiError from '../api-error.js';
import ContactService from '../Services/ContactService.js';
import Mongodb from '../Utils/mongodb.util.js';

class ContactController {
   async create(req, res, next) {
      if (!req.body?.name) {
         return next(new ApiError(400, 'Name can not be empty'));
      }
      try {
         const service = new ContactService(Mongodb.client);
         const document = await service.create(req.body);
         return res.send(document);
      } catch (error) {
         return next(new ApiError(500, 'An error occured while creating the contact'));
      }
   }

   async findAll(req, res, next) {
      let documents = [];
      try {
         const service = new ContactService(Mongodb.client);
         const { name } = req.query;
         if (name) {
            documents = await service.findByName(name);
         } else {
            documents = await service.find({});
         }
         return res.send(documents);
      } catch (error) {
         return next(new ApiError(500, 'An error occured while retrieving the contacts'));
      }
   }

   async update(req, res, next) {
      if (Object.keys(req.body).length === 0) {
         return new ApiError(400, 'Data to update can not empty');
      }
      try {
         const service = new ContactService(Mongodb.client);
         const document = await service.update(req.params.id, req.body);
         if (!document) {
            return next(new ApiError(400, 'Contact not found'));
         } else {
            return res.send({ message: 'Contact was updated successfully' });
         }
      } catch (error) {
         return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
         );
      }
   }

   async findOne(req, res, next) {
      try {
         const service = new ContactService(Mongodb.client);
         const document = await service.findById(req.params.id);
         if (!document) {
            return next(new ApiError(400, 'Contact not found'));
         } else {
            res.send(document);
         }
      } catch (error) {
         return next(
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
         );
      }
   }

   async delete(req, res, next) {
      try {
         const service = new ContactService(Mongodb.client);
         const document = await service.delete(req.params.id);
         if (!document) {
            return next(new ApiError(400, 'Contact not found'));
         } else {
            return res.send({ message: 'Contact was deleted successfully' });
         }
      } catch (error) {
         return next(
            new ApiError(500, `Could not delete contact with id=${req.params.id}`)
         );
      }
   }

   async deleteAll(req, res, next) {
      try {
         const service = new ContactService(Mongodb.client);
         const deleteCount = await service.deleteAll();
         return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
         });
      } catch (error) {
         return next(
            new ApiError(500, `Could not delete contact with id=${req.params.id}`)
         );
      }
   }

   async findAllFavorite(req, res, next) {
      try {
         const service = new ContactService(Mongodb.client);
         const documents = await service.findFavorite();
         return res.send(documents);
      } catch (error) {
         return next(
            new ApiError(500, `An error occured while retrieving favorite contacts`)
         );
      }
   }
}

export default new ContactController();
