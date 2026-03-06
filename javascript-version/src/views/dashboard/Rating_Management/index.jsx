'use client'
import React, { useState } from 'react'
import Rating_List from './Rating_List'
import View_Rating from './View_Rating'

const Rating_Management = () => {
    const [view, setView] = useState('list');
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentCategoryData, setCurrentCategoryData] = useState([]);

const ratingsData = {
    product: [
        { id: 1, name: 'Sofa', rating: '2.5/5', review: 'Good comfort but delivery was late', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop' },
        { id: 2, name: 'Dining Table', rating: '4.0/5', review: 'Sturdy build and looks premium', img: 'https://images.unsplash.com/photo-1577145900255-0c48317f2621?w=150&h=150&fit=crop' },
        { id: 3, name: 'Office Chair', rating: '4.5/5', review: 'Very comfortable for long working hours', img: 'https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?w=150&h=150&fit=crop' },
        { id: 4, name: 'King Bed', rating: '3.0/5', review: 'Average quality, mattress could be better', img: 'https://images.unsplash.com/photo-1505693419163-5f562fe9f54f?w=150&h=150&fit=crop' },
        { id: 5, name: 'Study Table', rating: '5.0/5', review: 'Excellent finish and very spacious', img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=150&h=150&fit=crop' },
        { id: 6, name: 'Bookshelf', rating: '3.5/5', review: 'Assembly was difficult but product is good', img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=150&h=150&fit=crop' },
    ],
    vendor: [
        { id: 1, name: 'Harry', rating: '2.5/5', review: 'Good behavior but slow response', img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Male
        { id: 2, name: 'Sarah', rating: '4.0/5', review: 'Very professional and helpful', img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Female
        { id: 3, name: 'Marc', rating: '4.5/5', review: 'Great collection and fair pricing', img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Male
        { id: 4, name: 'Jenny', rating: '3.0/5', review: 'Needs to improve delivery timelines', img: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Female
        { id: 5, name: 'Robert', rating: '4.8/5', review: 'Best vendor in the city!', img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Male
        { id: 6, name: 'Kevin', rating: '2.0/5', review: 'Cancelled order at the last moment', img: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Male
    ],
    delivery: [
        { id: 1, name: 'Rahul', rating: '4.5/5', review: 'Very polite and arrived on time', img: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Male
        { id: 2, name: 'Sameer', rating: '3.0/5', review: 'Packaging was a bit torn', img: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Male
        { id: 3, name: 'Priya', rating: '5.0/5', review: 'Fastest delivery ever!', img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Female
        { id: 4, name: 'Vikram', rating: '2.5/5', review: 'Refused to come to the 3rd floor', img: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Male
        { id: 5, name: 'Arjun', rating: '4.0/5', review: 'Handled fragile items with care', img: 'https://images.pexels.com/photos/842548/pexels-photo-842548.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Male
        { id: 6, name: 'Yash', rating: '3.5/5', review: 'Called too many times for location', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150' }, // Male
    ]
};

    const handleView = (row, categoryData) => {
        setSelectedRow(row);
        setCurrentCategoryData(categoryData);
        setView('view');
    };

    return (
        <>
            {view === 'list' ? (
                <Rating_List ratingsData={ratingsData} onView={handleView} />
            ) : (
                <View_Rating selectedItem={selectedRow} categoryData={currentCategoryData} onBack={() => setView('list')} />
            )}
        </>
    )
}

export default Rating_Management;