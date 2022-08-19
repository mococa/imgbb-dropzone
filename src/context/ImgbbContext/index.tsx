import React, { createContext, useContext } from 'react';

interface Props {
  /**
   * ImgBB API Key
   */
  imgbb_api_key: string;
  children?: React.ReactNode;
}

const ImgbbContext = createContext<Props>({} as Props);

export const ImgbbProvider = ({ imgbb_api_key, children }: Props) => {
  return (
    <ImgbbContext.Provider value={{ imgbb_api_key }}>
      {children}
    </ImgbbContext.Provider>
  );
};

export const useImgbb = (): Props => {
  const context = useContext(ImgbbContext);

  if (!context) {
    throw new Error('useImgbb must be used within an ImgbbProvider');
  }

  return context;
};
