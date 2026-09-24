"use client";
import {useEffect} from 'react';
export default function LegacyEnhancer(){useEffect(()=>{document.querySelectorAll<HTMLElement>('.toggle-header').forEach(h=>{h.addEventListener('click',()=>h.classList.toggle('closed'))})},[]);return null}
