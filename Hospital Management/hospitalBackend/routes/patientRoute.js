const patientModel = require('../models/patientSchema');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/patientApi', async (req, res)=> {
    try {
        const data = await patientModel.find({});
        res.send(data);
    } catch(err) {
        console.log("error during gettig patient-------->>>>>", err);
    }
});

router.get('/patientApi/:_id', async (req, res)=> {
    try {
        const data = await patientModel.find(req.params);
        res.json(data);
    } catch(err) {
        console.log("error during gettig patient-------->>>>>", err);
    }
});

router.get('/patientApiMobile/:mobile', async (req, res)=> {
    try {
        const data = await patientModel.find(req.params);
        res.json(data);
    } catch(err) {
        console.log("error during gettig patient-------->>>>>", err);
    }
});

router.get('/patientApiChart', async (req, res)=> {
    try {
        //let currentYear = currentDate.getFullYear();
        const monthsDataCount = [];
        const data = await patientModel.find({});
        for(let i = 0; i<=11; i++) {
            currentMonth = i+1;
            // currObjDates = data[i].dates;
            count = 0;
            for(let j= 0 ; j< data.length; j++) {
                dates = data[j].dates;
                for(let k = 0; k < dates.length; k++) {
                    date = dates[k];
                    dateMonth = new Date(date).getMonth() + 1;
                    //console.log("dateMonth: ", dateMonth);
                    if(dateMonth == currentMonth) {
                        count ++;
                    }
                }
            }
            monthsDataCount[i] = count;            
        }
        //console.log("monthsDataCountArray----", monthsDataCount);
        res.json(monthsDataCount);
    } catch(err) {
        console.log("error during gettig patients in graph-------->>>>>", err);
    }
});


router.get('/patientApiChartForDoctor/:d_id', async (req, res)=> {
    try {
        //let currentYear = currentDate.getFullYear();
        const monthsDataCount = [];
        const data = await patientModel.find(req.params);
        for(let i = 0; i<=11; i++) {
            currentMonth = i+1;
            // currObjDates = data[i].dates;
            count = 0;
            for(let j= 0 ; j< data.length; j++) {
                dates = data[j].dates;
                for(let k = 0; k < dates.length; k++) {
                    date = dates[k];
                    dateMonth = new Date(date).getMonth() + 1;
                    //console.log("dateMonth: ", dateMonth);
                    if(dateMonth == currentMonth) {
                        count ++;
                    }
                }
            }
            monthsDataCount[i] = count;            
        }
        //console.log("monthsDataCountArray----", monthsDataCount);
        res.json(monthsDataCount);
    } catch(err) {
        console.log("error during gettig patients in graph-------->>>>>", err);
    }
});

router.get('/patientsDoctorApi/:d_id', async (req, res)=> {
    try {
        const data = await patientModel.find(req.params);
        res.json(data);
    } catch(err) {
        console.log("error during gettig patient-------->>>>>", err);
    }
});



router.post('/patientApi', async (req, res)=> {

    try {
        const data = new patientModel(req.body);
        const saveResult = await data.save();
        res.send(saveResult);
    } catch(err) {
        console.log("error during save patient-------->>>>>", err);
    }
});

router.put('/patientApi/:_id', async (req, res)=> {
    console.log("listen in put method for updating patient");
    try {
        const patient = await patientModel.findById(req.params._id);
        //console.log("and fetch patients previous data before updating",patient);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        // Update the properties you want to change
        patient.name = req.body.name;
        patient.age = req.body.age;
        patient.gender = req.body.gender;
        patient.address = req.body.address;
        patient.mobile = req.body.mobile;
        patient.desease = req.body.desease;

        // Update the last items in the arrays
        if (patient.dates.length > 0) {
            const lastDateIndex = patient.dates.length - 1;
            patient.dates[lastDateIndex] = req.body.dates;
        } 

        if (patient.madicines.length > 0 && patient.madicines != null) {
            const lastMadicineIndex = patient.madicines.length - 1;
            patient.madicines[lastMadicineIndex] = req.body.madicines;
        } else {
           patient.madicines[0] = req.body.madicines;
        }

        if (patient.deseaseDetails.length > 0 && patient.deseaseDetails != null) {
            const lastDiseaseDetailIndex = patient.deseaseDetails.length - 1;
            patient.deseaseDetails[lastDiseaseDetailIndex] = req.body.deseaseDetails;
        } else {
            patient.deseaseDetails[0] = req.body.deseaseDetails;
        }

        if (patient.appointment != null && patient.appointment.length > 0) {
            const lastAppointmentIndex = patient.appointment.length - 1;
            patient.appointment[lastAppointmentIndex] = req.body.appointment;
        } else {
            if(patient.appointment != null){
                const lastAppointmentIndex = patient.appointment.length - 1;
                patient.appointment[lastAppointmentIndex + 1] = req.body.appointment;
            } else {
                console.log("find null appointment---");
                patient.appointment = req.body.appointment;
            }
        }

        // Save the updated document
        const updatedPatient = await patient.save();

        res.send(updatedPatient);
    } catch(err) {
        console.log("error during update patient-------->>>>>", err);
    }
});


router.put('/patientApi/:_id/:status', async (req, res)=> {
    console.log("listen in put method for new Entry of patient");
    try {
        // console.log("-----params-----", req.params._id);
        const currentPatient = await patientModel.find({_id: req.params._id});
        //console.log("currentPatient---->>>>>>>", currentPatient);
        const pushData = await addExtraData(currentPatient, req.body);
        console.log(pushData[0], "--------pushData");
        const data = await patientModel.updateOne({_id: req.params._id}, {$set: pushData[0]});
        res.send(data);
    } catch(err) {
        console.log("error during new entry of patient-------->>>>>", err);
    }
});

async function addExtraData(obj, requestData) {
    console.log("-----------in addExtraData function----------");
    //console.log(obj[0].deseaseDetails.length);
    //console.log(requestData,"----------reqData");

    const datesLength = obj[0].dates.length;
    const dDetailsLength = obj[0].deseaseDetails.length;
    const medicinesLength = obj[0].madicines.length;
    //console.log(obj[0].appointment.length,"---------appointment length--------- appDate ",obj[0].appointment);
    obj[0].dates[datesLength] = requestData.dates;
    obj[0].deseaseDetails[dDetailsLength] = requestData.deseaseDetails;
    obj[0].madicines[medicinesLength] = requestData.madicines;
    
    if(obj[0].appointment != null && requestData.appointment != null) {              // can not use obj[0].appointment.length !== requestData.dates, if appointment is null.
        const appLength = obj[0].appointment.length;
        if(obj[0].appointment[appLength-1] != null) {
            console.log("last appointment is not null---");
            obj[0].appointment[appLength] = requestData.appointment;
        } else {
            console.log("last appointment is null---");
            obj[0].appointment[appLength] = requestData.dates;
        }
        
    } else if( obj[0].appointment == null && requestData.appointment == null) {
        console.log("in 1st elseIf part of appointment");
        obj[0].appointment = requestData.appointment;     // can not use appointment[0], if appointment is null
    } else if(obj[0].appointment == null && requestData.appointment != null) {
        console.log("in 2nd elseIf part of appointment");
        const cDateLength = obj[0].dates.length;
        obj[0].appointment == requestData.dates[cDateLength-1];
    } else {        // obj[0].appointment != null && requestData.appointment == null
        console.log("in else part of appointment");
        const appLength = obj[0].appointment.length;
        obj[0].appointment[appLength] = requestData.appointment
    }

    obj[0].name = requestData.name;
    obj[0].age = requestData.age;
    obj[0].gender = requestData.gender;
    obj[0].mobile = requestData.mobile;
    obj[0].desease = requestData.desease;
    obj[0].address = requestData.address;
    obj[0].d_id = requestData.d_id;

    return obj;
}

module.exports = router;