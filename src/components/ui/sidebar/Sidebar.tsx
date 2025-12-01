'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { signIn, signOut, useSession } from "next-auth/react";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';
import { useUIStore } from '@/store';
import { useEffect } from 'react';

export const Sidebar = () => {
  const { data: session, status } = useSession()
  const isSideMenuOpen = useUIStore( state => state.isSideMenuOpen );
  const closeMenu = useUIStore( state => state.closeSideMenu );
  const callbackUrl = `${process.env.NEXT_PUBLIC_CALLBACK_URL}routes`;
  const handleClickSingIn  = async () => {
        const result = await signIn('cognito',{ redirect: false, callbackUrl });
        console.log({result});
  };
  const handleClickSingOut  = async () => {
    signOut();
  }

  useEffect(() => {
    console.log("session sidebar:", status);
  }, [status])


  return (
    <div>
      {
        isSideMenuOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
          />

        )
      }
      {
        isSideMenuOpen && (
          <div
            onClick={ closeMenu }
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />

        )
      }
      <nav
        className={
          clsx(
            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        }>
      {
        status === 'authenticated' && (
          <div className='absolute top-15 inline-block'><b>Bienvenido:</b> {session.user?.email}</div>
        )
      }
        <IoCloseOutline
          size={ 50 }
          className="absolute top-5 right-5 cursor-pointer inline-block"
          onClick={ () => closeMenu() }
        />


        {/* Input */ }
        <div className="relative mt-14">
          <IoSearchOutline size={ 20 } className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menú */ }

        {/* <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPersonOutline size={ 30 } />
          <span className="ml-3 text-xl">Perfil</span>
        </Link> */}

        <Link
          href="/historic"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={ 30 } />
          <span className="ml-3 text-xl">Histórico</span>
        </Link>

        {
          status === 'authenticated' && (
            <Link
              href="/routes"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={ 30 } />
              <span className="ml-3 text-xl">Rutas/Precios</span>
            </Link>
          )
        }        
        <div className="w-full h-px bg-gray-200 my-10" />
        {
          status === 'authenticated' && (
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all" 
              legacyBehavior
            >
              <a onClick={(e) => handleClickSingOut()}>
                <IoLogOutOutline size={ 30 } className='inline'/>
                <span className="ml-3 text-xl inline">Salir</span>
              </a>
            </Link>
          )
        }   
        {
          status === 'unauthenticated' && (
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all" 
              legacyBehavior
            >
              <a onClick={(e) => handleClickSingIn()}>
                <IoLogInOutline size={ 30 } className='inline'/>
                <span className="ml-3 text-xl inline">Ingresar</span>
              </a>

            </Link>
          )
        }                   

        {/* Line Separator */ }
        


        {/* <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoShirtOutline size={ 30 } />
          <span className="ml-3 text-xl">Productos</span>
        </Link> */}

{/* 
        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPeopleOutline size={ 30 } />
          <span className="ml-3 text-xl">Usuarios</span>
        </Link> */}


      </nav>





    </div>
  );
};