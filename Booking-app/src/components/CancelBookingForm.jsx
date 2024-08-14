import React from 'react';
import { useForm } from 'react-hook-form';
import { cancelBooking } from '../services/bookingService';

function CancelBookingForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await cancelBooking(data);
      alert('Booking cancelled successfully!');
      reset();
    } catch {
      alert('Failed to cancel booking. Please try again.');
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
      <button type="submit" className="btn btn-danger">Cancel Booking</button>
    </form>
  );
}

export default CancelBookingForm;
