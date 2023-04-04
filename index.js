/*
Import necessary library for making requests to the Github Rest API
*/

import { Octokit } from "https://cdn.skypack.dev/octokit";

/*
Declaration of buttons
*/
const buttonBuscar = document.getElementById("search");

const buttonNumOrgs = document.getElementById("showNumOrg");

/*
Function to sort a response JSON with all repositories from an organization by repository size
*/
function findMaxSizeObject(json) {
    return json.sort((repository1, repository2) => { return repository2.size - repository1.size })[0].size;
}

/*
Button 1 for organization search
*/

buttonBuscar.addEventListener("click", searchByOrganization);

async function searchByOrganization() {
    const nombre = document.getElementById("name").value;

    var octokit = new Octokit({
        auth: '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',
        baseUrl: 'https://api.github.com'
    })

    try {

        /*
        Request to API to get the number of repositories from a certain organization
        */

        var response1 = await octokit.request(`GET /orgs/${nombre}`, {
            org: `${nombre}`
        })

        document.getElementById("numRepos").textContent = response1.data.public_repos;

        /*
        Request to API to get the weight of the repositories from a certain organization
        */

        var response2 = await octokit.request(`GET /orgs/${nombre}/repos`, {
            org: `${nombre}`
        })

        var max = findMaxSizeObject(response2.data)
        document.getElementById("biggestRepos").textContent = `The biggest repository weighs ${max} Bytes`;


    } catch (error) {

        console.error(error);
        alert("An error occurred while getting information from the organization. Please try again later.");

    }
}

/*
Button 2 to get number of organizations
*/

buttonNumOrgs.addEventListener("click", numOrgs);

async function numOrgs() {
    try {

        const octokit = new Octokit({
            auth: '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',
            baseUrl: 'https://api.github.com'
        });


        /*
        Request to API to get the number of organizations
        */
        const response = await octokit.request(`GET /search/users?q=${encodeURIComponent('type:org')}`);
        document.getElementById("numOrgs").textContent = response.data.total_count;


    } catch (error) {

        console.error(error);
        alert('An error occurred while getting the number of organizations. Please try again later.');

    }
}