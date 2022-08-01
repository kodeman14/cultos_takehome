export const translations = {
  yourActivityText: 'Your Activity',
  totalEarnedText: 'Total Earned:',
  editActivityText: 'Edit Activity',
  createActivityText: 'Create Activity',
  placeholders: {
    thanksForText: 'Thanks for ',
    detailsInputText: 'Enter a description',
    platformSelectText: 'Select a platform',
    typeSelectText: 'Select activity type',
    deletePopupText: 'Row will be deleted, are you sure?',
    cancelPopupText: 'Data will be erased, are you sure?',
  },
  colHeaders: {
    dateCol: 'Date',
    detailsCol: 'Description',
    activityCol: 'Activity',
    earnedCol: 'Earned',
    actionsCol: 'Actions',
  },
  modalInputs: {
    detailsLabel: 'Description:',
    platformLabel: 'Social Platform:',
    typeLabel: 'Social Type:',
    pointsLabel: 'Points Label:',
    cancelBtn: 'Cancel',
    submitBtn: 'Confirm' ,
  },
  snackbars: {
    rowEdit: 'The row was successfully edited....for now',
    serverIssue: 'Server error, try loading again later!',
    missingFields: 'Some fields are missing, check below!',
    axiosSuccess: 'Congrats, row was successfully created',
    rowDelete: 'The row was successfully deleted....for now',
    axiosError: 'We ran into an error, please try again later',
  },
  errors: {
    descReq: 'The description input is required',
    descLength: 'Text must be between 5 to 50 characters long',
    platformReq: 'The social platform dropdown is required',
    activityReq: 'The activity type dropdown is required',
    pointsReq: 'The points field is required',
    pointsNum: 'Points must be a number',
    emptyForm: 'Cannot submit an empty form',
    noDataLoaded: 'No data loaded, server error!',
    emptyTable: 'No data exists, create a new activity!',
  },
  socialPlatform: {
    twitter: 'Twitter',
    facebook: 'Facebook',
    instagram: 'Instagram',
  },
  socialType: {
    liked: 'Liked',
    shared: 'Shared',
    posted: 'Posted',
  }
}