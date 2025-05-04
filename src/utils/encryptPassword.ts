const encryptPassword = (
  e: React.FormEvent<HTMLFormElement>,
): string | undefined => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const key = formData.get("key");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!key || !password || !confirmPassword) {
    alert("Please fill in all fields");
    return;
  }

  const encryptedPassword = CryptoJS.AES.encrypt(
    password.toString(),
    key.toString(),
  );
  return encryptedPassword.toString();
};

export default encryptPassword;
