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
      toast.error('Lozinke se ne podudaraju');
      return;
    }

    try {
      const { data } = await updateUserProfile({ firstName, lastName, password });
      setUser(data);
      toast.success('Profil ažuriran!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Greška');
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.profileColumn}>
        <h2 className={styles.heading}>Moj Profil</h2>
        <form onSubmit={submitHandler} className={styles.formCard}>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Ime</label>
            <input
              type="text"
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Prezime</label>
            <input
              type="text"
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={user?.email}
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nova Lozinka</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Ostavite prazno ako ne mijenjate"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Potvrdi Lozinku</label>
            <input
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Ažuriraj
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