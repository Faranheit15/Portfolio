
import React from 'react';
import Layout from '@/components/Layout';

const Tools = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Tools</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Useful tools and resources I've created or recommend for developers.
          </p>
          <p className="text-lg text-gray-600">
            Tools and resources coming soon...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Tools;
