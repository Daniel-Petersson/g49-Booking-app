import React from 'react';
import { useForm } from 'react-hook-form';
import { bookSlot } from '../services/bookingService';

function BookingForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await bookSlot(data);
      alert('Booking successful!');
      reset();
    } catch {
      alert('Failed to book. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="id" className="form-label">Booking ID</label>
        <input
          type="text"
          id="id"
          className="form-control"
          {...register('id', { required: true })}
        />
        {errors.id && <span className="text-danger">This field is required</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          className="form-control"
          {...register('email', { required: true })}
        />
        {errors.email && <span className="text-danger">This field is required</span>}
      </div>
      <button type="submit" className="btn btn-primary">Book</button>
    </form>
  );
}

export default BookingForm;
