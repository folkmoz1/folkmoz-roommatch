type SignUpInput = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phoneNumber: string;
};

const validateSignUpInput = ({
  fullName,
  email,
  password,
  passwordConfirmation,
  phoneNumber,
}: SignUpInput) => {
  const errors = {} as SignUpInput;

  if (fullName.trim() === '') {
    errors.fullName = 'ชื่อและนามสกุลต้องไม่เป็นค่าว่าง';
  }
  if (email.trim() === '') {
    errors.email = 'อีเมล์ต้องไม่เป็นค่าว่าง';
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'อีเมล์ต้องเป็นอีเมล์ที่ถูกต้อง';
    }
  }
  if (password === '') {
    errors.password = 'รหัสผ่านต้องไม่เป็นค่าว่าง';
  } else if (password !== passwordConfirmation) {
    errors.passwordConfirmation = 'รหัสผ่านไม่ตรงกัน';
  }

  if (phoneNumber.trim() === '') {
    errors.phoneNumber = 'เบอร์โทรศัพท์ต้องไม่เป็นค่าว่าง';
  } else {
    const regEx = /^0[0-9]{9}$/;
    if (!phoneNumber.match(regEx)) {
      errors.phoneNumber = 'เบอร์โทรศัพท์ต้องเป็นเบอร์ที่ถูกต้อง';
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

type SignInInput = {
  email: string;
  password: string;
};

const validateSignInInput = ({ email, password }: SignInInput) => {
  const errors = {} as SignInInput;

  if (email.trim() === '') {
    errors.email = 'อีเมลต้องไม่เป็นค่าว่าง';
  }
  if (password === '') {
    errors.password = 'รหัสผ่านต้องไม่เป็นค่าว่าง';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export { validateSignUpInput, validateSignInInput };
