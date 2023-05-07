import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

class CowinDashboard extends Component {
  state = {
    vaccinationByDateData: [],
    vaccinationByAgeData: [],
    vaccinationByGenderData: [],
    status: '',
  }

  componentDidMount() {
    this.getVaccinationStats()
  }

  getVaccinationStats = async () => {
    this.setState({status: 'loading'})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(vaccinationDataApiUrl, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const vaccinationByDate = fetchedData.last_7_days_vaccination
      const vaccinationByAge = fetchedData.vaccination_by_age
      const vaccinationByGender = fetchedData.vaccination_by_gender

      this.setState({
        vaccinationByDateData: vaccinationByDate,
        vaccinationByAgeData: vaccinationByAge,
        vaccinationByGenderData: vaccinationByGender,
        status: 'success',
      })
    } else {
      this.setState({status: 'failed'})
    }
  }

  renderSuccessView = () => {
    const {
      vaccinationByDateData,
      vaccinationByAgeData,
      vaccinationByGenderData,
    } = this.state
    return (
      <div className="mainContainer">
        <div className="logoAndText">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="webImage"
          />
          <h1 className="cowinText">Co-WIN</h1>
        </div>
        <h1 className="mainHead">CoWIN Vaccination in India</h1>
        <VaccinationCoverage vaccinationByDateData={vaccinationByDateData} />
        <VaccinationByGender
          vaccinationByGenderData={vaccinationByGenderData}
        />
        <VaccinationByAge vaccinationByAgeData={vaccinationByAgeData} />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="mainContainer">
      <div className="logoAndText">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="webImage"
        />
        <h1 className="cowinText">Co-WIN</h1>
      </div>
      <h1 className="mainHead">CoWIN Vaccination in India</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failedImage"
        alt="failure view"
      />
      <h1 style={{fontFamily: 'Roboto'}}>Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="mainContainer">
      <div className="logoAndText">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="webImage"
        />
        <h1 className="cowinText">Co-WIN</h1>
      </div>
      <h1 className="mainHead">CoWIN Vaccination in India</h1>
      <div data-testid="loader" className="loaderAlign">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </div>
  )

  render() {
    const {status} = this.state

    switch (status) {
      case 'success':
        return this.renderSuccessView()
      case 'failure':
        return this.renderFailureView()
      case 'loading':
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default CowinDashboard
