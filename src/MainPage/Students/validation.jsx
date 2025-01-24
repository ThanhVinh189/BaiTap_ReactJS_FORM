export const validateStudent = (values) => {
  const errors = {};

  if (!values.id.trim()) {
    errors.id = "*Mã SV là bắt buộc";
  } else if (!/^[0-9]+$/.test(values.id)) {
    errors.id = "*Mã SV phải là số";
  }

  if (!values.name.trim()) {
    errors.name = "*Họ tên là bắt buộc";
  } else if (
    !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẸẺẼỀỀỆỄỈỊỌỎỐỒỔỖỘỚỜỞỠỤỦỨỪửừữẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỆỄẾỀỂỆỄỈỊỊỌỎỐỒỔỖỘỚỜỞỠỤỦỨỪỆỄẾỈỊỌỎỐỒỔỖỘỚỜỞỠỤỦỨỪửừữỳỵỷỹ\s]+$/.test(
      values.name
    )
  ) {
    errors.name = "*Họ tên chỉ được chứa chữ cái";
  }

  if (!values.phone.trim()) {
    errors.phone = "*Số điện thoại là bắt buộc";
  } else if (!/^[0-9]{10}$/.test(values.phone)) {
    errors.phone = "*Số điện thoại phải có 10 chữ số";
  }

  if (!values.email.trim()) {
    errors.email = "*Email là bắt buộc";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "*Email không hợp lệ";
  }

  return errors;
};
