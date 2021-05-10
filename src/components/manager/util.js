export let last_exp = waiterFormData => {
  return waiterFormData?.data[0]?.last_experience?.last_exp
    ? waiterFormData?.data[0]?.last_experience?.last_exp
    : waiterFormData?.data[0]?.last_experience?.experience
    ? waiterFormData?.data[0]?.last_experience?.experience
    : waiterFormData?.data[0]?.last_experience;
};
