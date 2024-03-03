import noteModel from "../model/noteModel.js";

const createNoteController = async (req, res) => {

    try {

        const { title, content, user } = req.body;

        if (!title && !content) {
            return res.send({ message: "Your note is empty" })
        }

        const note = await new noteModel({ title, content, user: req.user._id }).save()

        res.status(201).send({
            success: true,
            message: "note created successfully",
            note
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while creating note",
            error
        })
    }

}

const deleteNoteController = async (req, res) => {
    try {

        await noteModel.findByIdAndDelete(req.params.nId);
        res.status(200).send({
            success: true,
            message: 'note deleted successfully'
        })

    } catch (error) {

        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting note",
            error
        })
    }
}

const getNotesController = async (req, res) => {

    try {

        const notes = await noteModel.find({ user: req.user._id });
        res.status(200).send({
            success: true,
            message: "get notes succesfully",
            notes
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while creating note",
            error
        })

    }
}
export { createNoteController, deleteNoteController, getNotesController }

