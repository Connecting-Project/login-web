import React from 'react';

function RestrictRoute({ component: Component, fallback: Fallback, isAllow }) {
  return isAllow ? <Component /> : <Fallback />;
}

export default RestrictRoute;
