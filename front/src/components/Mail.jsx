import axios from 'axios';
import { smoothieMenu2 } from "./smoothies.js"
import { smoothieMenu1 } from "./smoothies.js"
import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";

const MailSender = () => {
    const [subject, setSubject] = useState("");
    const [name, setName] = useState('');
    const [myNumber, setNumber] = useState('')
    const [orderName, setOrderName] = useState('Select a smoothie or Juice');
    const [message, setMessage] = useState("");
    const [price, setPrice] = useState('Price');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [expirationTime, setExpirationTime] = useState(null);
    const allSmoothies = [...smoothieMenu1, ...smoothieMenu2];
    const [myDate, setMyDate] = useState();


    useEffect(() => {
        // Check local storage for the disableButton key and expiration time
        const storedExpirationTime = localStorage.getItem('expirationTime');
        if (storedExpirationTime) {
            const parsedExpirationTime = parseInt(storedExpirationTime);
            // Check if expiration time has passed
            if (parsedExpirationTime > Date.now()) {
                setIsButtonDisabled(true);
                setExpirationTime(parsedExpirationTime);
            } else {
                // Remove disableButton key if expiration time has passed
                localStorage.removeItem('disableButton');
                localStorage.removeItem('expirationTime');
            }
        }

        // Set up a timer to check expiration time periodically
        const timer = setInterval(() => {
            const storedExpirationTime = localStorage.getItem('expirationTime');
            if (storedExpirationTime) {
                const parsedExpirationTime = parseInt(storedExpirationTime);
                // Check if expiration time has passed
                if (parsedExpirationTime > Date.now()) {
                    setIsButtonDisabled(true);
                    setExpirationTime(parsedExpirationTime);
                } else {
                    // Remove disableButton key if expiration time has passed
                    localStorage.removeItem('disableButton');
                    localStorage.removeItem('expirationTime');
                    setIsButtonDisabled(false);
                    setExpirationTime(null);
                }
            }
            setMyDate(new Date())

        }, 1000); // Check every second

        // Clean up timer on component unmount
        return () => clearInterval(timer);
    }, [myDate]);

    const sendEmail = async (e) => {
        e.preventDefault();
        if (!isButtonDisabled) {
            setIsButtonDisabled(true);
            const now = Date.now();
            const expiration = now + 2000 * 60;
            localStorage.setItem('disableButton', 'true');
            localStorage.setItem('expirationTime', expiration.toString());
            setExpirationTime(expiration);
            setTimeout(() => {
                localStorage.removeItem('disableButton');
                localStorage.removeItem('expirationTime');
                setIsButtonDisabled(false);
                setExpirationTime(null);
            }, 2000 * 60);
        } else {
            alert("Please wait before submitting again.");
        }
        try {
            const response = await axios.post('https://my-backend-xi.vercel.app/api', {
              subject,
              name,
              orderName,
              price,
              message,
              myNumber
            });
            console.log(response.data);
          } catch (error) {
            console.error('Error sending email:', error);
          }
    };

    const optionChange = (e) => {
        setSubject("Smoothie and Juice Order");
        const selectedSmoothie = allSmoothies.find(smoothie => smoothie.name === e.target.value);
        if (selectedSmoothie) {
            setPrice(selectedSmoothie.price);
            setOrderName(selectedSmoothie.name);
        }
    };
    return (
        <div>
            <div className="form-container">
                <h2><center>Make an Order</center></h2> <br />
                <form action="" onSubmit={sendEmail}>
                    <input
                        readOnly
                        hidden
                        type="text"
                        placeholder="Full name"
                        value={subject}
                        required
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <label className='text-change' htmlFor="">Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={name}
                        minLength={3}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className='text-change' htmlFor="">Select a category</label>
                    <select onChange={optionChange} required defaultValue="">
                        <option value="" disabled>
                            {orderName}
                        </option>
                        {allSmoothies.map((smooth) => (
                            <option value={smooth.name} key={smooth.name}>
                                {smooth.name}
                            </option>
                        ))}
                    </select>
                    <label className='text-change' htmlFor="">Price</label>
                    <input type="text" className='myprice' value={price == "Price" ? "Price" : " ₦" + price} readOnly />
                    <label className='text-change' htmlFor="">Phone Number</label>
                    <input
                        type="tel"
                        required
                        placeholder="08023423423"
                        pattern="(\+?234|0)[789][01]\d{8}"
                        title="Ex. 08000000000"
                        value={myNumber} onChange={(e) => setNumber(e.target.value)}
                    />
                    <label className='text-change' htmlFor="">Comments</label>
                    <textarea
                        minLength={10}
                        required
                        placeholder="Leave a specific message for orders, delivery type, payment method."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button disabled={isButtonDisabled}>
                        {expirationTime
                            ? `Your order has been made. Wait ${Math.ceil((expirationTime - Date.now()) / 1000)} seconds to place a new order.`
                            : "Send Email"}
                    </button>
                </form>
                <br />
                <br />

            </div>
            <footer>
                <div className="contact-container">
                    <h2>Contact Us</h2>
                    <p><IoCall /> <a href="tel:07046267731">Call Me</a></p>
                    <p><MdOutlineMail /> <a href="mailto:akinseloyintosinjoy@gmail.com">Send a Mail</a></p>
                    <p><FaWhatsapp /> <a href="https://wa.me/2347046267731">Whatsapp Me</a></p>
                    <p><IoLocationSharp /> Lagos, Nigeria</p>
                </div>
            </footer>
        </div>
    );
};
export default MailSender;
