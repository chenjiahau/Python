export const getBase64 = file => {
  return new Promise(resolve => {
    let baseURL = '';
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

export const stopPropagation = e => {
  e.stopPropagation();
}

export const controlDom = (className, classes, add = true) => {
  const dom = document.querySelector(`.${className}`);

  if (!dom) {
    return;
  }

  if (add) {
    classes.forEach(addClass => {
      dom.classList.add(addClass);
    });
  } else {
    classes.forEach(addClass => {
      dom.classList.remove(addClass);
    });
  }
}

export const setImg = (className, img) => {
  const dom = document.querySelector(`.${className}`);

  if (!dom) {
    return;
  }

  if (!img) {
    dom.src = '';
    return;
  }

  dom.src = img;
}

export const setBackgroundImg = (className, base64Img = null) => {
  const dom = document.querySelector(`.${className}`);

  if (!dom) {
    return;
  }

  if (!base64Img) {
    dom.style.backgroundImage = 'none';
    return;
  }

  dom.style.backgroundImage = `url(${base64Img})`;
}

export const setBackgroundColor = (className, color) => {
  const dom = document.querySelector(`.${className}`);

  if (!dom) {
    return;
  }

  dom.style.backgroundColor = color;
}

export const fetchImgFromUrl = (imgUrl, callback) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';

  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);
    callback(canvas.toDataURL());
  }

  img.onerror = (err) => {
    console.log(err);
  }

  img.src = imgUrl;
}

export const setFontColor = (className, color) => {
  const dom = document.querySelector(`.${className}`);

  if (!dom) {
    return;
  }

  dom.style.color = color;
}

export const setColor = (className, color) => {
  const dom = document.querySelector(`.${className}`);

  if (!dom) {
    return;
  }

  dom.style.color = color;
}

export const setFontSize = (className, size) => {
  const dom = document.querySelector(`.${className}`);

  if (!dom) {
    return;
  }

  dom.style.fontSize = `${size}px`;
}

export const setFontFamily = (className, fontFamily) => {
  const dom = document.querySelector(`.${className}`);

  if (!dom) {
    return;
  }

  dom.style.fontFamily = fontFamily;
}