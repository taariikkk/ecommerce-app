import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { updateUserProfile } from '../api/userApi';
import Orders from './Orders';
import toast from 'react-hot-toast';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await updateUserProfile({ firstName, lastName, password });
      setUser(data);
      toast.success('Profile updated successfully');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.profileColumn}>
        <h2 className={styles.heading}>Account Settings</h2>
        <form onSubmit={submitHandler} className={styles.formCard}>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="profileFirstName">First Name</label>
            <input
              id="profileFirstName"
              type="text"
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="profileLastName">Last Name</label>
            <input
              id="profileLastName"
              type="text"
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="profileEmail">Email</label>
            <input
              id="profileEmail"
              type="email"
              className={styles.input}
              value={user?.email || ''}
              disabled
              aria-describedby="emailHelp"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="profilePassword">New Password</label>
            <input
              id="profilePassword"
              type="password"
              className={styles.input}
              placeholder="Leave blank to keep current"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="profileConfirmPassword">Confirm Password</label>
            <input
              id="profileConfirmPassword"
              type="password"
              className={styles.input}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Update Profile
          </button>
        </form>
      </div>

      <div className={styles.ordersColumn}>
        <Orders /> 
      </div>

    </div>
  );
};

export default Profile;
