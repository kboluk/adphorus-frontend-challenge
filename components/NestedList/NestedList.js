import React from 'react'

class NestedList extends React.PureComponent {
  render () {
    const {
      listing: { children, name, deleted, expanded, city, phone },
      path, toggle
    } = this.props
    if (deleted) return ''
    return (
      <li>
        {
          children
            ? <button
              className={`expand${expanded ? ' expanded' : ''}`}
              onClick={() => toggle('expanded', path)}>
              >
            </button>
            : ''
        }
        <button className='delete' onClick={() => toggle('deleted', path)}>X</button>
        <span>{name} / {phone} / {city}</span>
        {
          children && expanded
            ? (
              <ul>
                {
                  children
                    .map((listing, idx) => (
                      <NestedList
                        listing={listing}
                        toggle={toggle}
                        path={[...path, idx]}
                        key={listing.id}
                      />))
                }
              </ul>
            )
            : null
        }
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              animation-timing-function: cubic-bezier(0.1,0.25,0.75,0.9);
            }
            to { opacity: 1; }
          }
          @keyframes rotateTo90 {
            from { transform: rotateZ(0deg); }
            to { transform: rotateZ(90deg); }
          }
          @keyframes rotateTo0 {
            from { transform: rotateZ(90deg); }
            to { transform: rotateZ(0deg); }
          }

          li {
            font-family: Georgia, serif;
            line-height: 1.5;
            list-style-type: none;
            border-bottom: 1px dashed #222;
            position: relative;
            animation: fadeIn 0.2s;
            display: flex;
            flex-direction: column;
          }
          span:before, span:after {
            width: 24px;
            height: 24px;
            margin-right: 6px;
            vertical-align: bottom;
            display: inline-block;
            content: ' ';
          }
          .expand:hover ~ span:before {
            background: #ddd;
          }
          span:hover, span:hover:before, button:hover ~ span {
            background: #f2f2f2;
          }
          li:last-child {
            border: 0;
          }
          ul {
            margin-left: 30px;
          }
          button {
            border: 0;
            background: transparent;
            position: absolute;
            font-size: .75em;
            height: 2em;
            width: 2em;
            outline: 0;
          }
          .expand {
            left: 0;
            animation: rotateTo0 0.1s;
            transform: rotateZ(0deg);
          }
          .expand.expanded {
            animation: rotateTo90 0.2s;
            transform: rotateZ(90deg);
          }
          .delete {
            right: 0;
          }
          .delete:hover {
            background: #fed9cc;
          }
        `}</style>
      </li>
    )
  }
}

export default NestedList
