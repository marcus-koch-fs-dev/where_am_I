import './InfoCard.scss'
import { getPositionInfo } from '../../api'
import { useContext, useEffect, useState } from 'react'
import { DataReverseGeoCode } from 'types/apiTypes'
import { PositionContext } from 'context/positionContext'

export const InfoCard = () => {
  const [positionInfo, setPositionInfo] = useState<DataReverseGeoCode>()
  const { coordinates } = useContext(PositionContext)

  useEffect(() => {
    if (!coordinates) return
    getPositionInfo(coordinates)
      .then((data: DataReverseGeoCode | undefined) => {
        if (data) {
          setPositionInfo(data)
        }
      })
      .catch((err) => console.error(err))
  }, [coordinates])

  const renderInfoCard = (positionInfo: DataReverseGeoCode) => {
    const { features } = positionInfo
    return features.map((item) => {
      const {
        address_line1,
        postcode,
        city,
        country,
        country_code,
        state,
        county,
        district,
        lat,
        lon,
        place_id
      } = item.properties
      return (
        <div className="infoCard__wrapper" key={place_id}>
          <header className="header__wrapper">
            <h1 className="header__h1">Where am I?</h1>
            <div className="countryFlag__wrapper">
              <img
                className="countryFlag__img"
                src={`https://flagcdn.com/${country_code}.svg`}
                alt="country_flag"
              />
            </div>
            <h3 className="header__h3">{`${country}`}</h3>
          </header>
          <main className="main__wrapper">
            <h3 className="main__h3">
              <span>{`Lat: ${lat.toFixed(3)}`}</span>
              <span>{`Lng: ${lon.toFixed(3)}`}</span>
            </h3>
            <table className="table-primary">
              <tbody>
                <tr className="table-primary__row">
                  <td className="table-primary__td">{`${address_line1}`}</td>
                </tr>
                <tr className="table-primary__row">
                  <td className="table-primary__td">{`${postcode} ${city}`}</td>
                </tr>
              </tbody>
            </table>
            <table className="table-secondary">
              <tbody>
                <tr className="table-secondary__row">
                  <td className="table-secondary__td">State:</td>
                  <td className="table-secondary__td">{`${state}`}</td>
                </tr>
                <tr className="table-secondary__row">
                  <td className="table-secondary__td">County:</td>
                  <td className="table-secondary__td">{`${county}`}</td>
                </tr>
                <tr className="table-secondary__row">
                  <td className="table-secondary__td">District:</td>
                  <td className="table-secondary__td">{`${district}`}</td>
                </tr>
              </tbody>
            </table>
          </main>
        </div>
      )
    })
  }

  return <>{positionInfo && renderInfoCard(positionInfo)}</>
}
