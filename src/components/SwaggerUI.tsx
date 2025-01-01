import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css'; // Import default Swagger UI styles

const SwaggerUIComponent = () => {
  const specUrl = '/swagger-output.json'; // Path to your OpenAPI spec file (place it in the static folder)
  const baseUrl = 'https://api.fakegeo.com'; // Your desired base URL

  return (
    <div style={{ margin: '20px 0' }}>
      <SwaggerUI
        url={specUrl} // Relative path to your Swagger spec file
        requestInterceptor={(req) => {
          if (req.loadSpec) {
            // Let the spec file load from the relative path without modification
            return req;
          }
          
          // For API requests triggered by "Try it out," update the base URL
          if (baseUrl) {
            const apiPath = new URL(req.url, window.location.origin).pathname; // Extract the relative path
            req.url = `${baseUrl}${apiPath}`; // Prepend the base URL
          }
          return req;
        }}
      />
    </div>
  );
};

export default SwaggerUIComponent;
