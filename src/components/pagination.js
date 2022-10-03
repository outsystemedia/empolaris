import React from "react";

export default function Pagination({
    postsPerPage,
    totalPosts,
    paginateFront,
    paginateBack,
    currentPage,
}) {


    return (
        <div className='py-2 flex justify-between items-center'>
            <div>
                <p className='text-sm text-gray-700'>
                    Mostrando
                    <span className='font-medium'> {((currentPage-1) * postsPerPage)+1 } </span>
                    até
                    <span className='font-medium'> {(currentPage * postsPerPage) > totalPosts ? totalPosts : (currentPage * postsPerPage)  } </span>
                    de
                    <span className='font-medium'> {totalPosts} </span>
                    casas
                </p>
            </div>
            <div>
                <nav
                    className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                    aria-label='Pagination'
                >
                    <button
                        onClick={() => {
                            paginateBack();
                        }}
                        className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                        <span>Anterior</span>
                    </button>

                    <button
                        onClick={() => {
                            paginateFront();
                        }}
                        className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                        <span>Próximo</span>
                    </button>
                </nav>
            </div>
        </div>
    );
}