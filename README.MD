                        #Learning

## Collection vs Documents
A Database contains a collection, and a collection contains documents and the documents contain data, they are related to each other. 
Database = E-commerce
Collection = User
Documents = Four documents contains name, email and password of the students

## model.countDocuments()
In MongoDB, the countDocuments() method counts the number of documents that matches to the selection criteria. It returns a numeric value that represents the total number of documents that match the selection criteria. It takes two arguments first one is the selection criteria and other is optional. 

This method does not use metadata to return the count. It performs aggregation of the documents and returns a precise count.
You are allowed to use this method in multi-document transactions.
This method returns 0 for empty collection or if the given collection is not present in the database.
In this method, you are not allowed to use $where, $near, and $nearSphere operators as a part of the query expressions. 