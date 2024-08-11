import React from 'react';

const ProductHuntEmbed = () => {
  const embedHTML = `
    <a href="https://www.producthunt.com/posts/foxus-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-foxus&#0045;ai" target="_blank">
      <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=478636&theme=neutral" alt="Foxus&#0032;AI - AI&#0032;Generated&#0032;Learning&#0032;Sessions | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" />
    </a>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: embedHTML }} />
  );
};

export default ProductHuntEmbed;
