import React, { useState, useEffect } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import {Country, State, City} from 'country-state-city'
import Select from 'react-select'

//* STYLES
import styles from '../styles/Form.module.scss'

const SelectCity = ({detail, values, handlerCsc}) => {

    const t = useTranslations('checkout.Billing_Info')

    const { csc_value, parent_value } = values
    const countries = Country.getAllCountries();

    const updatedCountries = countries.map((country) => ({
        label: country.name,
        value: country.id,
        ...country
    }));
    const updatedStates = (countryId) =>
        State
        .getStatesOfCountry(countryId)
        .map((state) => ({ label: state.name, value: state.id, ...state }));
    const updatedCities = (countryCode, stateId) =>
        City
        .getCitiesOfState(countryCode, stateId)
        .map((city) => ({ label: city.name, value: city.id, ...city }));

    let options

    switch (detail){
        case "country": options = updatedCountries;
        break;
        case "state": options = updatedStates(parent_value ? parent_value : null);
        break;
        case "city": options = updatedCities(parent_value[0], parent_value[1]); 
        break;
        default: ;
        break;
    }


  return (
    <Select
        id={detail}
        instanceId={detail}
        options={options}
        value={{label:csc_value !== "" ? csc_value : t(`${detail}`), value:csc_value}}
        // placeholder={t(`${detail}`)}
        className={styles["select-csc"]}
        onChange={handlerCsc}
    />
  )
}

export default SelectCity