package com.parrit.controllers;

import com.parrit.repositories.StateRepository;
import com.parrit.entities.State;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StateController {

    StateRepository stateRepository;

	@Autowired
	public StateController(StateRepository repository) {
		this.stateRepository = repository;
	}

    @RequestMapping(path = "/state", method = RequestMethod.POST, consumes = {"application/json"})
	public void save(@RequestBody State state) {
        System.out.println(state);
    	stateRepository.save(state);
    }

    private JSONObject defaultStateJSON() {
        JSONObject settings = new JSONObject();
        settings.put("canMove", true);

        JSONObject Tim = new JSONObject();
        Tim.put("name", "Tim");
        JSONObject Anthony = new JSONObject();
        Anthony.put("name", "Anthony");
        JSONObject Gaurav = new JSONObject();
        Gaurav.put("name", "Gaurav");
        JSONObject Marianna = new JSONObject();
        Marianna.put("name", "Marianna");
        JSONObject Tony = new JSONObject();
        Tony.put("name", "Tony");
        JSONObject Pete = new JSONObject();
        Pete.put("name", "Pete");
        JSONObject Jared = new JSONObject();
        Jared.put("name", "Jared");
        JSONObject Fonzie = new JSONObject();
        Fonzie.put("name", "Fonzie");
        JSONObject Brian = new JSONObject();
        Brian.put("name", "Brian");
        JSONObject Kea = new JSONObject();
        Kea.put("name", "Kea");
        JSONObject Lance = new JSONObject();
        Lance.put("name", "Lance");
        JSONObject Liz = new JSONObject();
        Liz.put("name", "Liz");
        JSONObject Sree = new JSONObject();
        Sree.put("name", "Sree");

        JSONArray people = new JSONArray();
        people.add(Tim);
        people.add(Anthony);
        people.add(Gaurav);
        people.add(Marianna);
        people.add(Tony);
        people.add(Pete);
        people.add(Jared);
        people.add(Fonzie);
        people.add(Brian);
        people.add(Kea);
        people.add(Lance);
        people.add(Liz);
        people.add(Sree);

        JSONObject Floating = new JSONObject();
        Floating.put("name", "Floating");
        Floating.put("people", people);
        JSONObject Design = new JSONObject();
        Design.put("name", "Design");
        JSONObject Product = new JSONObject();
        Product.put("name", "Product");
        JSONObject Wellesley = new JSONObject();
        Wellesley.put("name", "Wellesley");
        JSONObject Pico2 = new JSONObject();
        Pico2.put("name", "Pico2");
        JSONObject Manchester = new JSONObject();
        Manchester.put("name", "Manchester");
        JSONObject Larchmont = new JSONObject();
        Larchmont.put("name", "Larchmont");
        JSONObject Culver = new JSONObject();
        Culver.put("name", "Culver");
        JSONObject Out_of_Office = new JSONObject();
        Out_of_Office.put("name", "Out of Office");

        JSONArray stations = new JSONArray();
        stations.add(Floating);
        stations.add(Design);
        stations.add(Product);
        stations.add(Wellesley);
        stations.add(Pico2);
        stations.add(Manchester);
        stations.add(Larchmont);
        stations.add(Culver);
        stations.add(Out_of_Office);

        JSONObject workspace =  new JSONObject();
        workspace.put("stations", stations);

        JSONObject state = new JSONObject();
        state.put("settings", settings);
        state.put("workspace", workspace);

        return state;
    }
}
