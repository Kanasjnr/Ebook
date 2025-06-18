const Ebook = require("../models/ebookModel")
const asyncHandler = require("express-async-handler");
const {genrateUniqueId} = require("../utils")


// Create an Ebook 

const createEbook = asyncHandler(async (req, res) => {
    const {name, overview, long_description, price, rating, poster, inStock, bestSeller, size} = req.body

    const existing = await Ebook.findOne({name})
    if (existing){
        res.status(400)
        throw new Error("book name already in use")
    }

    if(!name || !overview || !long_description || !price || !rating || !poster ||  !size){
        res.status(400);
        throw new Error("All fields are required")
    }

    if(rating < 0 || rating > 5){
        res.status(400);
        throw new Error("Ratings can only be between 0 - 5")
    }

    const id  = await genrateUniqueId();

    const ebook = new Ebook({
        id,
        name,
        overview,
        long_description,
        price,
        rating,
        poster,
        size,
        in_stock: inStock || true,
        best_seller: bestSeller || false
    })

    const savedEbook = await ebook.save();

    res.status(201).json(savedEbook)

})

const updateEbook = asyncHandler(async (req, res) => {
      const {id} = req.params;

   try {
    const ebook = await Ebook.findOne({id})

    if (ebook){

        ebook.price = req.body.price || ebook.price;
        ebook.poster = req.body.poster || ebook.poster;

        ebook.overview = req.body.overview || ebook.overview;
        ebook.rating = req.body.rating || ebook.rating;

        ebook.in_stock = req.body.in_stock || ebook.in_stock;
        ebook.best_seller = req.body.best_seller || ebook.best_seller;

        ebook.long_description = req.body.long_description || ebook.long_description;

        const updatedEbook = await ebook.save();
        res.status(200).json(updatedEbook)
    }else{
        res.status(404).json({error: "Ebook not found"});

    }

    
   } catch (error) {
    res.status(500).json({error: "Internal server error"})
   }
})

const getAllEbooks = asyncHandler(async (req, res) => {
    const { search } = req.query;
    
    let query = {};
    if (search) {
        query = {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { overview: { $regex: search, $options: 'i' } }
            ]
        };
    }
    
    const ebooks = await Ebook.find(query);

    if(!ebooks){
        res.status(500)
        throw new Error("Something went wrong")
    }

    res.status(200).json(ebooks)
})

const getAnEbook = asyncHandler(async (req, res) => {
    const {id} = req.params
    const ebook = await Ebook.findOne({id})

    if(ebook){
        const {
            _id,
             id,
        name,
        overview,
        long_description,
        price,
        rating,
        poster,
        size,
        in_stock,
        best_seller
        } = ebook


        res.status(200).json({
               _id,
             id,
        name,
        overview,
        long_description,
        price,
        rating,
        poster,
        size,
        in_stock,
        best_seller
        })
    }else{
        res.status(400)
        throw new Error("Ebook not found")
    }
})

const getFeaturedProducts = asyncHandler(async (req, res) => {
    const featuredBooks = await Ebook.find({ best_seller: true });

    if(!featuredBooks){
        res.status(500)
        throw new Error("Something went wrong fetching featured products")
    }

    res.status(200).json(featuredBooks)
})

module.exports = {
    createEbook,
    updateEbook,
    getAllEbooks,
    getAnEbook,
    getFeaturedProducts
}