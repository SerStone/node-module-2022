const {flatFileService} = require('../services');

module.exports = {
    getAllFlats: async (req, res, next) => {
        try {
            const flats = await flatFileService.reader();

            res.json(flats);

        } catch (e){
            next(e);
        }
    },
    getFlatById: async (req, res, next)=>{
        try {
            res.json(req.flatter);

        } catch (e){
            next(e);
        }
    },
    createFlat: async (req, res, next)=> {
        try {

            const flatInfo = req.body;
            const flats = await flatFileService.reader();
            const newFlat = {
                id: flats[flats.length-1].id+1,
                name:flatInfo.name,
                rooms:flatInfo.rooms,
                price:flatInfo.price
            };
            flats.push(newFlat);

            await flatFileService.writer(flats);

            res.status(201).json(newFlat);
        } catch (e) {
            next(e);
        }
    },
    deleteFlat: async (req, res, next) => {
        try {
            const {flatter, flats} = req;

            const index = flats.findIndex((u)=> u.id === flatter.id);
            flats.splice(index,1);

            await flatFileService.writer(flats);

            res.sendStatus(204)
        } catch (e){
            next(e);
        }
    },
    updateFlat: async (req, res, next) => {
        try {
            const {flatter, flats, body} = req;

            const index = flats.findIndex((u)=> u.id === flatter.id);
            flats[index] = { ...flats[index], ...body};

            await flatFileService.writer(flats);

            res.status(201).json(flats[index])
        }catch (e){
            next(e);
        }
    }
}