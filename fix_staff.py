import os
import re

file_path = 'Frontend-cpr/people.html'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

staff_list_html = """        <div class="staff-list">
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Racheal-Kimani-PhD.webp" alt="Racheal Kimani"></div>
            <div class="staff-info">
              <h4>Racheal Kimani, <span class="credentials">PhD</span></h4>
              <p class="staff-title">Research Scientist</p>
              <p class="staff-skills">Genomic surveillance, Antimicrobial resistance monitoring, and Molecular bioinformatics.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Rachael-Wachuka.webp" alt="Rachael Wachuka"></div>
            <div class="staff-info">
              <h4>Rachael Wachuka, <span class="credentials">PhD</span></h4>
              <p class="staff-title">Scientist</p>
              <p class="staff-skills">Tropical disease research, Advanced immunology, and Clinical assay development.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Harrison-Waweru.webp" alt="Harrison Waweru"></div>
            <div class="staff-info">
              <h4>Harrison Waweru</h4>
              <p class="staff-title">Data Scientist</p>
              <p class="staff-skills">Statistical modeling, Genomic data processing, and Data visualization.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Lucy-Mwai-Gichuki.webp" alt="Lucy Mwai"></div>
            <div class="staff-info">
              <h4>Lucy Mwai Gichuki</h4>
              <p class="staff-title">Lab Technician</p>
              <p class="staff-skills">Blood sample processing, Biobanking protocols, and Molecular diagnostics.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Mark-Makau.webp" alt="Mark Makau"></div>
            <div class="staff-info">
              <h4>Mark Makau</h4>
              <p class="staff-title">Lab Technician</p>
              <p class="staff-skills">DNA/RNA extraction, Laboratory quality control, and Instrument maintenance.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Juliet-Matheru.webp" alt="Juliet Matheru"></div>
            <div class="staff-info">
              <h4>Juliet Matheru</h4>
              <p class="staff-title">Lab Technologist</p>
              <p class="staff-skills">Clinical serology, Parasite culture, and Advanced microscopy.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Paul-Adamba.webp" alt="Paul Adamba"></div>
            <div class="staff-info">
              <h4>Paul Adamba</h4>
              <p class="staff-title">Lab Technician</p>
              <p class="staff-skills">Histology, Tissue staining techniques, and Microscopy support.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Anthony-Kipkoech.webp" alt="Anthony Kipkoech"></div>
            <div class="staff-info">
              <h4>Anthony Kipkoech</h4>
              <p class="staff-title">Lab Assistant</p>
              <p class="staff-skills">Reagent preparation, Laboratory safety compliance, and Sample cataloging.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Jane-Ngure.webp" alt="Jane Ngure"></div>
            <div class="staff-info">
              <h4>Jane Ngure</h4>
              <p class="staff-title">Research Nurse</p>
              <p class="staff-skills">Maternal patient care, Clinical sampling, and Vital signs monitoring.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Ibrahim-Ndirangu.webp" alt="Ibrahim Ndirangu"></div>
            <div class="staff-info">
              <h4>Ibrahim Ndirangu</h4>
              <p class="staff-title">Field Researcher</p>
              <p class="staff-skills">Patient recruitment, Specimen cold-chain transport, and Field interviews.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Alfred-K.-Kibungei.webp" alt="Alfred K. Kibungei"></div>
            <div class="staff-info">
              <h4>Alfred K. Kibungei</h4>
              <p class="staff-title">Field Coordinator</p>
              <p class="staff-skills">Community logistics, Resource allocation, and Site supervision.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Mary-Kioko.webp" alt="Mary Kioko"></div>
            <div class="staff-info">
              <h4>Mary Kioko</h4>
              <p class="staff-title">Field Officer</p>
              <p class="staff-skills">Community health engagement, Research awareness programs, and Liaison.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Simon-Irungu.webp" alt="Simon Irungu"></div>
            <div class="staff-info">
              <h4>Simon Irungu</h4>
              <p class="staff-title">Field Lead</p>
              <p class="staff-skills">Field team leadership, Local authority liaison, and Protocol training.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Maurine-Mutua.webp" alt="Maurine Mutua"></div>
            <div class="staff-info">
              <h4>Maurine Mutua</h4>
              <p class="staff-title">Research Officer</p>
              <p class="staff-skills">Project monitoring, Ethical compliance, and Technical reporting.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Virginia-Wambui.webp" alt="Virginia Wambui"></div>
            <div class="staff-info">
              <h4>Virginia Wambui</h4>
              <p class="staff-title">Admin Coordinator</p>
              <p class="staff-skills">Finance management, Grant administration, and Office operations.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Ronnie-Mwangi.webp" alt="Ronnie Mwangi"></div>
            <div class="staff-info">
              <h4>Ronnie Mwangi</h4>
              <p class="staff-title">IT Support</p>
              <p class="staff-skills">Server maintenance, Network security, and Research data backup.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Melvin-Mbalitsi.webp" alt="Melvin Mbalitsi"></div>
            <div class="staff-info">
              <h4>Melvin Mbalitsi</h4>
              <p class="staff-title">Logistics Specialist</p>
              <p class="staff-skills">Cold chain logistics, Field transport, and Sample delivery safety.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Stephen-Kimemia.webp" alt="Stephen Kimemia"></div>
            <div class="staff-info">
              <h4>Stephen Kimemia</h4>
              <p class="staff-title">Data Clerk</p>
              <p class="staff-skills">Registry management, Archiving, and Digital database entry.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Patrick-Ndinguri.webp" alt="Patrick Nding'uri"></div>
            <div class="staff-info">
              <h4>Patrick Nding'uri</h4>
              <p class="staff-title">Research Assistant</p>
              <p class="staff-skills">Clinical data management, Lab support, and Trial coordination.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Samuel-M.-Nganga.webp" alt="Samuel M. Nganga"></div>
            <div class="staff-info">
              <h4>Samuel M. Nganga</h4>
              <p class="staff-title">Logistics Lead</p>
              <p class="staff-skills">Facility management, Procurement, and Infrastructure support.</p>
            </div>
          </div>
          <div class="staff-card">
            <div class="staff-img"><img src="../people/Mary-Wachira.webp" alt="Mary Wachira"></div>
            <div class="staff-info">
              <h4>Mary Wachira</h4>
              <p class="staff-title">Research Intern</p>
              <p class="staff-skills">Clinical research methodologies and Electronic Data Capture (EDC).</p>
            </div>
          </div>
        </div>"""

pattern = re.compile(r'        <div class="staff-grid">.*?        </div>', re.DOTALL)
new_content = pattern.sub(staff_list_html, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
