export default function Validation(formData) {
    const errors = {};

    // Regular expressions
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const numberPattern = /^\+?[1-9]\d{1,14}$/;

    // Validate name
    if (formData.name.trim() === '') {
        errors.name = 'Name is Required';
    }

    // Validate email
    if (formData.email.trim() === '') {
        errors.email = 'Email is Required';
    } else if (!emailPattern.test(formData.email)) {
        errors.email = 'Email is not correct';
    }

      // Validate phone number
      if (formData.number.trim() === '') {
        errors.number = 'Phone number is Required';
    } else if (!numberPattern.test(formData.number)) {
        errors.number = 'Phone number must be number only';
    } else if (formData.number.trim().length < 7) {
        errors.number = 'Phone number must be at least 7 digits';
    }

    // Validate date of birth
    if (formData.dob.trim() === '') {
        errors.dob = 'Date of Birth is Required';
    }

    return errors;
}
