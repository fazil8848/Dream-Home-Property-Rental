// import express from 'express';

const getDashboard = async (req,res)=>{
    try {
        res.send("Admin Dashboard")
    } catch (error) {
        console.log("geDashboard :-", error.message);
    }
}

export default {
    getDashboard
}
