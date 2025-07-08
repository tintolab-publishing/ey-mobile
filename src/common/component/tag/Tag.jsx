/*
variant(string) : yellow, gray-txt-bk, gray-txt-wh, red, green, pink, blue, light-yellow, light-pink, line-yellow, line-green
tagType(string) : time, progress, count, approve, request, rev
state(string) : submit
rounded(boolean)
 */

const Tag = ({ text, variant, tagType='', state='', rounded = false }) => {
    return (
        <div className={`tag ${variant} ${tagType} ${state} ${rounded ? 'rounded' : ''}`}>
            {text}
        </div>
    );
};

export default Tag;