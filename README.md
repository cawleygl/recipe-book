# Recipe Book

## Overview
This application is a MERN stack web application that will be used to store and view recipes. The MERN stack tutorial available through MongoDB was used to aid in initial setup and development. Currently, recipes can be created and saved to the database, along with recipe directions and ingredients. Directions can be edited, reordered, and deleted, while ingredients can be added to a  ingredient table, and then associated with individual recipes in a many-to-many relationship by creating entries in a "calls for" table. When adding an ingredient to a recipe, a modifier can also be added to the "calls for" document to note any details specific to the recipe. These specific database associations are intended to properly format directions as a list in different styles, and allow ingredients to be reused with many different recipes, while creating an association with the same ingredient across recipes.

## Planned Features
Future developments include a shopping list feature that will utilize the ingredient associations to combine the necessary ingredients from multiple recipes to create, save, and display a shopping list for users.

## Technologies Used
MongoDB, Express.js, Node.js and Node Package Manager, React.js

## Screenshot
![Screenshot 2024-11-20 at 10 52 19 PM](https://github.com/user-attachments/assets/ed82b4ed-bad7-402b-a438-956c7bae65e9)
