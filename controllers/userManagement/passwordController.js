/*
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const express = require('express');*/
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import express from 'express';

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'gerard.murphy99@ethereal.email',
        pass: 'JPA6bMqnk7aCJf66bv'
    }
});

// Route pour réinitialiser le mot de passe

const reset = async (req, res) => {
    const { email } = req.body; // Récupérer l'e-mail de la requête

    try {
        // Générer un nouveau mot de passe temporaire
        const newPassword = generateRandomPassword();
        // Mettre à jour le mot de passe de l'utilisateur dans la base de données
        await updateUserPassword(email, newPassword);

        // Préparer le contenu de l'e-mail
        // Envoyer l'e-mail de réinitialisation
        const info = await transporter.sendMail({
            from: '"SAMAR👻" <gerard.murphy99@ethereal.email>', // sender address
            to: 'gerard.murphy99@ethereal.email', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Your new password ! ', // plain text body
            html: `<b>New password : ${newPassword}?</b>` // html body
        });
        res.json({ message: 'E-mail de réinitialisation envoyé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Échec de l'envoi de l'e-mail de réinitialisation." });
    } finally {
        return res;
    }
};

// Fonction pour générer un mot de passe aléatoire
function generateRandomPassword() {
    const length = 10; // Longueur du mot de passe
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}

// Fonction pour mettre à jour le mot de passe de l'utilisateur dans la base de données
async function updateUserPassword(email, newPassword) {
    /*
    
    ------------HERE--------------------
    
     */
    const client = await MongoClient.connect('mongodb://localhost:27017');

    const user = await collection.findOne({ email });
    if (!user) {
        throw new Error('Utilisateur introuvable avec cet e-mail.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await collection.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

    await client.close();
}

export default reset;
