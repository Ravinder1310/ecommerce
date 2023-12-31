import React from 'react'

const Loader = () => {
  return (
    <>
      <div class="text-center mt-60">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default Loader