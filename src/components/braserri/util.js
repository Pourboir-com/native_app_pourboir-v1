export const handleDeleteItem = async (fn, body, successFn) => {
  await fn(body, {
    onSuccess: async () => {
      successFn();
    },
    onError: e => {
      alert(e?.response?.data?.message);
    },
  });
};
