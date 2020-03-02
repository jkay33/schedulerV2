Backend api information:

DB model design:
    requestor_name:{
        type: String
    },
    appt_date:{
        type: Date
    },
    appt_status:{
        type: String
    },
    appt_price:{
        type: Number
    }


The base path is set to “/appt” therefore all routes shall extend from this base path.
All responses will return in JSON format.

Route “/“ is defined as GET:
	-This route will retrieve all entries in database
Route “/:id” is defined as GET:
	-This route will retrieve one record specified in the request parameter.
	-To use, replace “:id” with “_id” value.
Route “/create” is defined as POST:
	-This route will create the record in the database.
	-Follow the DB model design to avoid any errors.
Route “/update/:id” is defined as PUT:
	-This route will update the ID specified in the request parameter.
Route “/delete/:id” is defined as DELETE:
	-This route will delete the record associated to the ID in request parameter.
Route “/find/desc/:min/:max” is defined as GET:
	-This route will return appointments within the min and max range specified in the request parameter.
	-The query is designed to retrieve the records within the range then sorts by price in descending order.
	-To utilize the min and max use ex: 2-2-2020/2-3-2020.
Route “/find/asc/:min/:max” is defined as GET:
	-See “/find/desc/:min/:max”.
Route “/gen/data/:num” is defined as POST:
	-This route generates random data and inserts into the database.
	-The “:num” parameter defines how many records to create.