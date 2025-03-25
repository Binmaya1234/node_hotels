const e = require('express');
const { update, add } = require('lodash');
const mongoose = require('mongoose');
const { use } = require('passport');
const bcrypt = require('bcrypt');
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    work: { 
        type: String,
        enum: ['Chef', 'Waiter', 'Manager'],
        required: true
    },
    mobile: {  
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});
personSchema.pre('save', async function(next){
    try{
        if(this.isModified('password')){
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    }catch(error){
        next(error);
    }
});
personSchema.methods.comparePassword = async function(password){
    try{
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    }catch(error){
        return error;
    }
}   
const Person = mongoose.model('Person', personSchema);
module.exports = Person;