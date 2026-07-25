
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('active'); }
    });
});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const sheetUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_VMo1_cQsK7lYKnhXqMDFJcBIKtWkEMU4b585SjJ3-moIh9OgCofTuBuNShhpODcfRZY9_7LGjgIe/pub?output=csv';

fetch(sheetUrl)
    .then(response => response.text())
    .then(text => {
        const track = document.getElementById('testimonial-track');

        if (!track) return;

        const rows = text
            .split('\n')
            .slice(1)
            .filter(row => row.trim() !== '');

        rows.forEach(row => {
            const cols = parseCsvRow(row);

            const parent = cols[0]?.trim() || '';
            const child = cols[1]?.trim() || '';
            const feedback = cols[2]?.trim() || '';

            if (!feedback) return;

            track.innerHTML += `
                <div class="testimonial-card">
                    <div class="testimonial-quote">❝</div>

                    <div class="testimonial-text">
                        ${feedback}
                    </div>

                    <div class="testimonial-author">
                        ${parent}
                        ${child ? `<small>Parent of ${child}</small>` : ''}
                    </div>
                </div>
            `;
        });

        track.innerHTML += track.innerHTML;
    })
    .catch(error => {
        console.error('Unable to load parent reflections:', error);
    });

function parseCsvRow(row) {
    const result = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < row.length; i++) {
        const char = row[i];

        if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
            result.push(current.replace(/"/g, ''));
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current.replace(/"/g, ''));

    return result;
}
