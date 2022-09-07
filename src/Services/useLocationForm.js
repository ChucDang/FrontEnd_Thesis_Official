import { useState, useEffect } from 'react'
import { FETCH_TYPES } from '../Constants/fetch_types';
import { PATHS } from '../Constants/path';
import axios from 'axios';
async function fetchLocationOptions(fetchType, locationId) {
    let url;
    switch (fetchType) {
        case FETCH_TYPES.CITIES: {
            url = PATHS.CITIES;

            break;
        }
        case FETCH_TYPES.DISTRICTS: {
            url = `${PATHS.DISTRICTS}/${locationId}.json`;
            break;
        }
        case FETCH_TYPES.WARDS: {
            url = `${PATHS.WARDS}/${locationId}.json`;
            break;
        }
        default: {
            return [];
        }
    }
    const locations = (await axios.get(url)).data["data"];

    return locations.map(({ id, name }) => ({ value: id, label: name })).sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
}
async function fetchInitialData(shouldFetchInitialLocation) {
    const { city, district, ward } = shouldFetchInitialLocation

    const [cities] = await Promise.all([
        fetchLocationOptions(FETCH_TYPES.CITIES),
    ]);
    let cityObject = cities.find((c) => c.label === city)
    const [districts] = await Promise.all([
        fetchLocationOptions(FETCH_TYPES.DISTRICTS, cityObject.value),
    ]);
    let districtObject = districts.find((d) => d.label === district)
    const [wards] = await Promise.all([
        fetchLocationOptions(FETCH_TYPES.WARDS, districtObject.value)
    ]);
    let wardObject = wards.find((d) => d.label === ward)
    return {
        cityOptions: cities,
        districtOptions: districts,
        wardOptions: wards,
        selectedCity: cityObject,
        selectedDistrict: districtObject,
        selectedWard: wardObject,
    };
}

function useLocationForm(shouldFetchInitialLocation) {
    const [state, setState] = useState({
        cityOptions: [],
        districtOptions: [],
        wardOptions: [],
        selectedCity: null,
        selectedDistrict: null,
        selectedWard: null,
    });

    const { selectedCity, selectedDistrict } = state;

    useEffect(() => {
        (async function () {
            if (shouldFetchInitialLocation != null) {
                const initialData = await fetchInitialData(shouldFetchInitialLocation);
                setState(initialData);
            } else {
                const options = await fetchLocationOptions(FETCH_TYPES.CITIES)
                setState({ ...state, cityOptions: options })
            }
        })();
    }, []);

    useEffect(() => {
        (async function () {
            if (!selectedCity) return;
            const options = await fetchLocationOptions(FETCH_TYPES.DISTRICTS, selectedCity.value);
            setState({ ...state, districtOptions: options })
        })();
    }, [selectedCity]);

    useEffect(() => {
        (async function () {
            if (!selectedDistrict) return;
            const options = await fetchLocationOptions(FETCH_TYPES.WARDS, selectedDistrict.value);
            setState({ ...state, wardOptions: options })
        })()
    }, [selectedDistrict])

    function onCitySelect(option) {
        setState({
            ...state,
            districtOptions: [],
            wardOptions: [],
            selectedCity: option,
            selectedDistrict: null,
            selectedWard: null,
        });
    }

    function onDistrictSelect(option) {

        setState({
            ...state,
            wardOptions: [],
            selectedDistrict: option,
            selectedWard: null,
        });
    }

    function onWardSelect(option) {

        setState({ ...state, selectedWard: option });
    }

    return { state, onCitySelect, onDistrictSelect, onWardSelect };
}
export default useLocationForm