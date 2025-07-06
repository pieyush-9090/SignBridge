// Utility functions for sign language processing

export interface SignImage {
  character: string;
  imageUrl: string;
  isLetter: boolean;
}

/**
 * Fetches a sign language image for a given character
 */
export const fetchSignImage = async (character: string): Promise<string> => {
  const upperChar = character.toUpperCase();
  
  // Only process letters A-Z
  if (!/^[A-Z]$/.test(upperChar)) {
    return '';
  }

  // Just return the API route for the SVG
  return `/api/signs/${upperChar}`;
};

/**
 * Processes text and returns an array of sign images
 */
export const processTextToSigns = async (text: string): Promise<SignImage[]> => {
  const signs: SignImage[] = [];
  
  for (const char of text) {
    const upperChar = char.toUpperCase();
    if (/^[A-Z]$/.test(upperChar)) {
      const imageUrl = await fetchSignImage(upperChar);
      signs.push({
        character: upperChar,
        imageUrl,
        isLetter: true
      });
    }
    // Ignore all other characters (no placeholders)
  }
  
  return signs;
};

/**
 * Filters text to only include letters and spaces
 */
export const filterTextForSigns = (text: string): string => {
  return text.replace(/[^A-Za-z\s]/g, '').trim();
}; 