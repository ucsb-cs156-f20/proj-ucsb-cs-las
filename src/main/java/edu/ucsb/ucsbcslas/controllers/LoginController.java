package edu.ucsb.ucsbcslas.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.entities.Admin;
import edu.ucsb.ucsbcslas.entities.AppUser;
import edu.ucsb.ucsbcslas.repositories.AdminRepository;
import edu.ucsb.ucsbcslas.repositories.AppUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
const MongoClient = require("mongodb").MongoClient;
var CONNECTION_URL = "https://cloud.mongodb.com/v2/5fc5a6b766b85644648b465e#clusters";
const DATABASE_NAME = "login";
MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
	if (error) {
	    throw error;
	}
	database = client.db(DATABASE_NAME);
	console.log("Connected to `" + DATABASE_NAME + "`!");
    }):
@RestController
@RequestMapping("/api")
public class LoginController {
    MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://localhost:27017"));
    MongoClient mongoClient = new MongoClient();
    //    DB database = mongoClient.getDB("login");
    DBCollection collection = database.getCollection("log");
    DBObject person = new BasicDBObject("given_name", gn)
	.append("family_name", fn)
	.append("nickname", nn)
	.append("name", name)
	.append("picture", pic)
	.append("locale", locale)
	.append("updated_at", updatedat)
	.append("email",email)
	.append("email_verified",emailverified)
	.append("sub", sub);
    //    MongoClient mongoClient = new MongoClient();
    MongoClient mongoClient = new MongoClient();
    DB database = mongoClient.getDB("Examples");
    DBCollection collection = database.getCollection("people");
    <p>collection.insert(person);//need be in a loop
    
    public static final DBObject toDBObject(Person person) {
	return new BasicDBObject("given_name", gn)
	    .append("family_name", fn)
	    .append("nickname", nn)
	    .append("name", name)
	    .append("picture", pic)
	    .append("locale", locale)
	    .append("updated_at", updatedat)
	    .append("email",email)
	    .append("email_verified",emailverified)
	    .append("sub", sub);
    }
    collection.insert(PersonAdaptor.toDBObject(myPerson));
}

const express = require('express');
const app = express();

app.use(express.static('./backend/uploads'));
