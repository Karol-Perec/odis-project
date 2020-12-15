import React from 'react';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Comment from '../../components/commentsPage/comment.component';

configure({ adapter: new Adapter() });

describe('Insecure <Comment />', () => {
  it('should pass and inject <script> tag through content', () => {
    const comment = shallow(
      <Comment
        isSecure={false}
        username={'Karol'}
        content={'<script></script>'}
      />
    );
    let mnt = mount(
      <Comment
        isSecure={false}
        username={'Karol'}
        content={'<script></script>'}
      />
    );
    let x = mnt.find('script');
    debugger;
    expect(comment.find('div > p > script')).toHaveLength(1);
  });
});

describe('Secure <Comment />', () => {
  it('should not pass <script> tag through content', () => {
    const comment = shallow(
      <Comment
        isSecure={true}
        username={'Karol'}
        content={'<script></script>'}
      />
    );

    expect(comment.find('div > p > script')).toHaveLength(0);
  });
});
