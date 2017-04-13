import React, { PropTypes } from 'react';
import { Form, Input, Select, Textarea } from 'formsy-react-components';
import './bootstrapForm.scss';     //later need move to folder Styles
import './index.scss';

const selectCountry = [
  {value: null, label: 'Select your country'},
  {value: 'United States', label: 'United States'},
  {value: 'Afghanistan', label: 'Afghanistan'},
  {value: 'Aland Islands', label: 'Aland Islands'},
  {value: 'Albania', label: 'Albania'},
  {value: 'Algeria', label: 'Algeria'}
];
const selectDay = [
  {value: null, label: 'Day'},
  {value: 1, label: '1'}
];
const selectMonth = [
  {value: null, label: 'Month'},
  {value: 'Jan', label: 'Jan'},
  {value: 'Feb', label: 'Feb'},
  {value: 'Mar', label: 'Mar'}
];
const selectYear = [
  {value: null, label: 'Year'},
  {value: 1900, label: '1900'},
  {value: 1901, label: '1901'},
  {value: 1902, label: '1902'}
];
const selectVisibility = [
  {value: 'Public', label: 'Public'},
  {value: 'Me', label: 'Only me'}
];

const EngagementFormStep1 = ({
                                onSubmit,
                                onInvalidSubmit,
                                bio_value,
                                occ_value,
                                company_value,
                                country_value,
                                location_value,
                                birthDate_value,
                                birthMonth_value,
                                birthDateVisibility_value,
                                birthYear_value,
                                birthYearVisibility_value,
                                twitter_value,
                                facebook_value,
                                linkedin_value,
                                websites_value,
                                telephone_value,
                                skype_value
                            }) => {
  return (
      <Form
        onSubmit={onSubmit}
        onInvalidSubmit={onInvalidSubmit}
        rowClassName = {[{'form-group': false}, {row: false}, 'engagement-form']}
      >

        <div className="engagement-wrap-form">
          <Textarea
            rows={5}
            cols={40}
            name="bio"
            label="Bio"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper']}
            value={bio_value}
          />
          <Input
            name="occupation"
            value={occ_value}
            label="Occupation"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper']}
            type="text"
          />
          <Input
            name="company"
            value={company_value}
            label="Company"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper']}
            type="text"
          />
          <Select
            name="country"
            value={country_value}
            label="Country"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper']}
            className = {'form-control engagement-form-select'}
            placeholder="Select your country"
            options={selectCountry}
          />
          <Input
            name="location"
            value={location_value}
            label="Location"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper']}
            type="text"
          />
          <div className="engagement-form-birth-date">
            <Select
              name="birth-date"
              value={birthDate_value}
              label="Birth Date"
              labelClassName={[{'col-sm-3': false}, 'engagement-label']}
              elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper engagement-element-wrapper-small']}
              className = {'form-control engagement-form-select engagement-form-select-small'}
              style = {{left: '140px'}}
              options={selectDay}
            />

            <Select
              name="birth-month"
              value={birthMonth_value}
              labelClassName={[{'col-sm-3': false}, 'disabled-label']}
              className = {'form-control engagement-form-select engagement-form-select-small'}
              elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper engagement-element-wrapper-small']}
              style = {{left: '250px'}}
              options={selectMonth}
            />

            <Select
              name="birth-date-visibility"
              value={birthDateVisibility_value}
              labelClassName={[{'col-sm-3': false}, 'disabled-label']}
              className = {'form-control engagement-form-select engagement-form-select-small'}
              elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper engagement-element-wrapper-small birth-visibility']}
              style = {{left: '360px'}}
              options={selectVisibility}
            />
          </div>
          <div className="engagement-form-birth-date engagement-form-birth-year">
            <Select
              name="birth-year"
              value={birthYear_value}
              label="Birth Year"
              labelClassName={[{'col-sm-3': false}, 'engagement-label']}
              elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper engagement-element-wrapper-small']}
              className = {'form-control engagement-form-select engagement-form-select-small'}
              style = {{left: '140px'}}
              options={selectYear}
            />

            <Select
              name="birth-date-visibility"
              value={birthYearVisibility_value}
              labelClassName={[{'col-sm-3': false}, 'disabled-label']}
              className = {'form-control engagement-form-select engagement-form-select-small'}
              elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper engagement-element-wrapper-small']}
              style = {{left: '250px'}}
              options={selectVisibility}
            />
          </div>

          <Input
            name="twitter"
            value={twitter_value}
            label="Twitter"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper']}
            type="url"
          />
          <Input
            name="facebook"
            value={facebook_value}
            label="Facebook"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper']}
            type="url"
          />
          <Input
            name="linkedin"
            value={linkedin_value}
            label="Linkedin"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper']}
            type="url"
          />
          <Input
            name="websites"
            value={websites_value}
            label="Websites"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper']}
            type="url"
          />
          <Input
            name="telephone"
            value={telephone_value}
            label="Telephone"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper']}
            type="text"
          />
          <Input
            name="skype"
            value={skype_value}
            label="Skype"
            labelClassName={[{'col-sm-3': false}, 'engagement-label']}
            elementWrapperClassName = {[{'col-sm-9': false}, 'engagement-element-wrapper']}
            type="text"
          />

          <div className="engagement-wrap-btn">
            <div>
              <button className="engagement-btn" type="submit">Save and Continue</button> <br/>
              <button className="engagement-btn engagement-btn-skip">Skip</button>
            </div>
          </div>

        </div>
      </Form>

  );
};

EngagementFormStep1.propTypes = {
  onSubmit: PropTypes.func,
  onInvalidSubmit: PropTypes.func,

  bio_value:PropTypes.string,
  occ_value: PropTypes.string,
  company_value: PropTypes.string,
  country_value: PropTypes.string,
  location_value: PropTypes.string,
  birthDate_value: PropTypes.string,
  birthMonth_value: PropTypes.string,
  birthDateVisibility_value: PropTypes.string,
  birthYear_value: PropTypes.string,
  birthYearVisibility_value: PropTypes.string,
  twitter_value: PropTypes.string,
  facebook_value: PropTypes.string,
  linkedin_value: PropTypes.string,
  websites_value: PropTypes.string,
  telephone_value: PropTypes.string,
  skype_value: PropTypes.string
};

export default EngagementFormStep1;
