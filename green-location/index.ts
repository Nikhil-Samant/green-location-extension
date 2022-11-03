import tl = require('azure-pipelines-task-lib');
import axios from 'axios';
import path from 'path';

tl.setResourcePath(path.join(__dirname, 'task.json'));

const locationDict: { [key: string]: string } = {
    'UK': 'UK South',
    'PJM_ROANOKE': 'East US',
    'PJM_DC': 'East US 2',
    'NEM_NSW': 'Australia East',
    'MISO_MASON_CITY': 'Central US',
    'PACE': 'West Central US',
    'NEM_VIC': 'Australia Southeast',
    'IE': 'North Europe',
    'CAISO_NORTH': 'West US',
    'AZPS': 'West US 3',
    'GCPD': 'West US 2'
};

const azureLocations: { [key: string]: string } = {
    "East US": "eastus",
    "East US 2": "eastus2",
    "South Central US": "southcentralus",
    "West US 2": "westus2",
    "West US 3": "westus3",
    "Australia East": "australiaeast",
    "North Europe": "northeurope",
    "UK South": "uksouth",
    "Central US": "centralus",
    "West US": "westus",
    "West Central US": "westcentralus",
    "Australia Central": "australiacentral",
    "Australia Central 2": "australiacentral2",
    "Australia Southeast": "australiasoutheast",
    "UK West": "ukwest"
}

type EmissionDetails = {
    location: string;
    time: string;
    rating: number;
    duration: string;
};

type GetEmissionResponse = EmissionDetails[];

async function run() {
    try {
        const baseUrl: string = 'https://carbon-aware-api.azurewebsites.net/emissions/bylocations/best?';
        const inputLocations: string[] = tl.getDelimitedInput('locations', ',', true);
        if (isLocationEmpty(inputLocations)) {
            tl.setResult(tl.TaskResult.Failed, tl.loc('LocationNotSelected'));
            return;
        }
        console.log(tl.loc('SelectedLocations'), inputLocations.join());
        let locations: string[] = [];
        inputLocations.forEach(loc => {
            locations.push(azureLocations[loc.trim()])
        })
        console.log(tl.loc('SelectedLocations'), locations.join());
        
        const queryString: string = createQueryString(locations);
        
        const url = baseUrl + queryString;
        console.log(tl.loc('PrintUrl'), url)

        const response = await invokeRequest(url);
        console.log(JSON.stringify(response));

        const bestLocation = locationDict[response[0].location];
        console.log(tl.loc('BestLocation'), bestLocation);
        tl.setVariable('bestLocation', bestLocation)
    }
    catch (err: any) {
        if (axios.isAxiosError(err)) {
            console.log(tl.loc('ApiErrorResponse'), err.message);
        }
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

function isLocationEmpty(inputLocations: string[]) {
    return inputLocations.length == 0 || inputLocations[0].trim().length === 0;
}

function createQueryString(locations: string[]): string {
    let queryString: string = '';

    locations.forEach(loc => {
        if (queryString === '') {
            queryString = 'location=' + loc;
        }
        else {
            queryString += '&location=' + loc;
        }
    })
    return queryString;
}

async function invokeRequest(url: string) {
    const { data } = await axios.get<GetEmissionResponse>(
        url,
        {
            headers: {
                Accept: 'application/json'
            },
        },
    );
    return data
}

run();