import { fireEvent, render, screen } from '@testing-library/react'
import Home from '../pages/zoop/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  beforeEach(() => {
    render(<Home />)
  })
  
  describe('"zoop zoop" input and event', () => {
    const setUp = () => {
      const input = screen.getByPlaceholderText('오늘은 어떤 표현을 줍줍하셨나요?') as HTMLInputElement;
      const button = screen.getByRole('zoop-zoop');

      return {input, button};
    }

    it('should zoop zoop input be in the document', async () => {
      const {input} = setUp();
      expect(input).toBeInTheDocument();
    })
    
    it('should change input value when change event emitted', () => {
      const {input} = setUp();

      fireEvent.change(input, {target:{value:"What doesn't kill you makes you stronger~!"}});
      expect(input.value).toBe("What doesn't kill you makes you stronger~!");
    })
    
    it('should zoop zoop submit button be in the document',async () => {
      const {button} = setUp();
      expect(button).toBeInTheDocument();
    })
  })
})