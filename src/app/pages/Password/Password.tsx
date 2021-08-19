import React from 'react';
import { useParams } from 'react-router';
export default function Password(): JSX.Element {
  const { service, name } = useParams<{ service: string; name: string }>();
  return (
    <p>
      This is your {service} page, from {name}
    </p>
  );
}
